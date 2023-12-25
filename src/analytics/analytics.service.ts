import { Injectable } from '@nestjs/common';
import { FeedService } from 'src/feed/feed.service';

@Injectable()
export class AnalyticsService {
  private analyticsRawData = [];

  constructor(private postsServices: FeedService) {}

  public async getPostsAnalytics() {
    const allPosts = await this.postsServices.getAllPosts();
    this.analyticsRawData = allPosts;

    return this.analyticsRawData;
  }
}
