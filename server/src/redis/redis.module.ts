import {
  DynamicModule,
  FactoryProvider,
  Module,
  ModuleMetadata,
  Provider,
} from '@nestjs/common';
import IORedis, { Redis, RedisOptions } from 'ioredis';

export const IO_REDIS_KEY = 'IORedis';

/**
 * Options for creating the Redis client
 */
export interface RedisModuleOptions {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
}

/**
 * Async options for registering the module
 */
export interface RedisAsyncModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
  inject?: any[];
}

@Module({})
export class RedisModule {
  /**
   * Async registration (recommended for env-based or dynamic config)
   */
  static registerAsync({
    useFactory,
    inject = [],
    imports = [],
  }: RedisAsyncModuleOptions): DynamicModule {
    const redisProvider: FactoryProvider = {
      provide: IO_REDIS_KEY,
      useFactory: async (...args: any[]) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);

        const client = new IORedis(connectionOptions);
        // ioredis 5+ requires explicit connect for some transports
        if (typeof client.connect === 'function') {
          await client.connect();
        }

        onClientReady?.(client);
        return client;
      },
      inject,
    };

    const connectionCleanupProvider: Provider = {
      provide: `${IO_REDIS_KEY}_CLEANUP`,
      useFactory: (client: Redis) => {
        // Attach a shutdown hook to gracefully disconnect when Nest exits
        const shutdown = async () => {
          try {
            await client.quit();
          } catch {
            // fallback to disconnect if quit fails
            client.disconnect();
          }
        };
        // Note: Nest does not auto-run this unless you wire it via lifecycle; simplest is to rely on process exit
        return {
          onModuleDestroy: shutdown,
        };
      },
      inject: [IO_REDIS_KEY],
    };

    return {
      module: RedisModule,
      imports,
      providers: [redisProvider, connectionCleanupProvider],
      exports: [redisProvider],
    };
  }
}
