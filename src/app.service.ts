import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  @Client({ transport: Transport.MQTT })
  public client: ClientProxy;

  getHello(): string {
    return 'Hello World!';
  }

  public async onModuleInit(): Promise<void> {
    Logger.log('Connecting');
    await this.client.connect();
    Logger.log('Connected');

    await (await this.sendMessage()).toPromise()


  }

  async sendMessage(): Promise<any> {
    const data: number[] = [5, 6];
    return this.client.send<number>('notifications', data);
  }
}
