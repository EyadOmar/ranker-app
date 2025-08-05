import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express'; // Assuming you are using express as the underlying platform
import { ConfigService } from '@nestjs/config'; // For accessing environment variables

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string; // Or whatever header you choose

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    // Get the expected API key from your environment variables
    const expectedApiKey = this.configService.get<string>('API_KEY');

    if (apiKey !== expectedApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
