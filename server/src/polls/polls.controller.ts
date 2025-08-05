import { Controller, Post, Body } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { JoinPollDto } from './dto/join-poll.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollsService.create(createPollDto);
  }

  @Post('/join')
  join(@Body() joinPollDto: JoinPollDto) {
    return this.pollsService.join(joinPollDto);
  }

  @Post('/rejoin')
  rejoin() {
    return this.pollsService.rejoin(1);
  }
}
