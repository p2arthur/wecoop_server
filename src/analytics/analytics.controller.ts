import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('/analytics')
export class AnalyticsController {
  constructor(private analyticsServices: AnalyticsService) {}

  @Get('/posts')
  async getPostsAnalytics() {
    const rawData = this.analyticsServices.getPostsAnalytics();

    return rawData;
  }
}
