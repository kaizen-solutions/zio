/*
 * Copyright 2021 John A. De Goes and the ZIO Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package zio

import zio.internal._
import zio.stacktracer.TracingImplicits.disableAutoTrace

import java.util.concurrent.atomic.AtomicBoolean

/**
 * An entry point for a ZIO application that allows sharing service builders
 * between applications. For a simpler version that uses the default ZIO
 * environment see `ZIOAppDefault`.
 */
trait ZIOApp extends ZIOAppPlatformSpecific { self =>
  private[zio] val shuttingDown = new AtomicBoolean(false)

  implicit def tag: Tag[Environment]

  type Environment <: Has[_]

  /**
   * A service builder that manages the acquisition and release of services
   * necessary for the application to run.
   */
  def serviceBuilder: ZServiceBuilder[Has[ZIOAppArgs], Any, Environment]

  /**
   * The main function of the application, which can access the command-line
   * arguments through the `args` helper method of this class. If the provided
   * effect fails for any reason, the cause will be logged, and the exit code of
   * the application will be non-zero. Otherwise, the exit code of the
   * application will be zero.
   */
  def run: ZIO[Environment with ZEnv with Has[ZIOAppArgs], Any, Any]

  /**
   * Composes this [[ZIOApp]] with another [[ZIOApp]], to yield an application
   * that executes the logic of both applications.
   */
  final def <>(that: ZIOApp)(implicit trace: ZTraceElement): ZIOApp =
    ZIOApp(self.run.zipPar(that.run), self.serviceBuilder +!+ that.serviceBuilder, self.hook >>> that.hook)

  /**
   * A helper function to obtain access to the command-line arguments of the
   * application. You may use this helper function inside your `run` function.
   */
  final def getArgs(implicit trace: ZTraceElement): ZIO[Has[ZIOAppArgs], Nothing, Chunk[String]] =
    ZIOAppArgs.getArgs

  /**
   * A helper function to exit the application with the specified exit code.
   */
  final def exit(code: ExitCode)(implicit trace: ZTraceElement): UIO[Unit] =
    UIO {
      if (!shuttingDown.getAndSet(true)) {
        try Platform.exit(code.code)
        catch { case _: SecurityException => }
      }
    }

  /**
   * A hook into the ZIO runtime configuration used for boostrapping the
   * application. This hook can be used to install low-level functionality into
   * the ZIO application, such as logging, profiling, and other similar
   * foundational pieces of infrastructure.
   */
  def hook: RuntimeConfigAspect = RuntimeConfigAspect.identity

  /**
   * Invokes the main app. Designed primarily for testing.
   */
  final def invoke(args: Chunk[String])(implicit trace: ZTraceElement): ZIO[ZEnv, Any, Any] =
    ZIO.runtime[ZEnv].flatMap { runtime =>
      val newRuntime = runtime.mapRuntimeConfig(hook)

      val newServiceBuilder =
        ZServiceBuilder.environment[ZEnv] +!+ ZServiceBuilder.succeed(ZIOAppArgs(args)) >>>
          serviceBuilder +!+ ZServiceBuilder.environment[ZEnv with Has[ZIOAppArgs]]

      newRuntime.run(run.provideServices(newServiceBuilder))
    }

  def runtime: Runtime[ZEnv] = Runtime.default
}
object ZIOApp {

  /**
   * A class which can be extended by an object to convert a description of a
   * ZIO application as a value into a runnable application.
   */
  class Proxy(val app: ZIOApp) extends ZIOApp {
    type Environment = app.Environment
    override final def hook: RuntimeConfigAspect =
      app.hook
    final def serviceBuilder: ZServiceBuilder[Has[ZIOAppArgs], Any, Environment] =
      app.serviceBuilder
    override final def run: ZIO[Environment with ZEnv with Has[ZIOAppArgs], Any, Any] =
      app.run
    implicit final def tag: Tag[Environment] =
      app.tag
  }

  /**
   * Creates a [[ZIOApp]] from an effect, which can consume the arguments of the
   * program, as well as a hook into the ZIO runtime configuration.
   */
  def apply[R <: Has[_]](
    run0: ZIO[R with ZEnv with Has[ZIOAppArgs], Any, Any],
    serviceBuilder0: ZServiceBuilder[Has[ZIOAppArgs], Any, R],
    hook0: RuntimeConfigAspect
  )(implicit tagged: Tag[R]): ZIOApp =
    new ZIOApp {
      type Environment = R
      def tag: Tag[Environment] = tagged
      override def hook         = hook0
      def serviceBuilder        = serviceBuilder0
      def run                   = run0
    }

  /**
   * Creates a [[ZIOApp]] from an effect, using the unmodified default runtime's
   * configuration.
   */
  def fromZIO(run0: ZIO[ZEnv with Has[ZIOAppArgs], Any, Any])(implicit trace: ZTraceElement): ZIOApp =
    ZIOApp(run0, ZServiceBuilder.environment, RuntimeConfigAspect.identity)
}