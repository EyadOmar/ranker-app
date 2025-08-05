import { Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { JoinPollDto } from './dto/join-poll.dto';
import { createPollId, createUserId } from 'src/common/helpers/ids.helper';

@Injectable()
export class PollsService {
  async create(createPollDto: CreatePollDto) {
    const pollId = createPollId();
    const userId = createUserId();
  }

  async findOne(id: number) {
    return `This action returns a #${id} poll`;
  }

  async join(joinPollDto: JoinPollDto) {
    const userId = createUserId();

    console.log('Joining poll with data:', joinPollDto);
    return `This action joins a #${id} poll`;
  }

  async rejoin(id: number) {
    return `This action rejoins a #${id} poll`;
  }
}
