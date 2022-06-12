import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { ConfigService } from '@nestjs/config'
import { publishDto } from 'dtos/publishMessage';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) {};
  private pubSubClient = new PubSub();
  private topicNameOrId = this.configService.get('TOPICNAMEORID');

  async publishMessage(publishDto: publishDto) {
    const message = publishDto.message;
    const dataBuffer = Buffer.from(message);
    try {
      const messageId = await this.pubSubClient
        .topic(this.topicNameOrId)
        .publishMessage({data: dataBuffer});
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  }

  async getHello() {
    return 'Hello'
  }
  
}
