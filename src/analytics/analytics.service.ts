import { Injectable } from '@nestjs/common';
import { FeedService } from 'src/feed/feed.service';
import { PostInterface } from 'src/interfaces/PostInterface';

@Injectable()
export class AnalyticsService {
  private analyticsRawData = [];

  constructor(private postsServices: FeedService) {}

  private async countPostsByCreator(postsList: PostInterface[]) {
    const counter = {};

    postsList.forEach((post) => {
      const creatorAddress = post.creator_address;

      if (counter[creatorAddress]) {
        if (post.text.length > 3) {
          counter[creatorAddress]++;
        }
      } else {
        counter[creatorAddress] = 1;
      }
    });

    return counter;
  }

  private async getTopCreators(allPosts: PostInterface[]) {
    const postCounter = await this.countPostsByCreator(allPosts);
    const sortedCreators = Object.keys(postCounter).sort(
      (a, b) => postCounter[b] - postCounter[a],
    );
    return sortedCreators;
  }

  public async getPostsAnalytics() {
    const allPosts = await this.postsServices.getAllPosts();
    const counterPostByCreator = await this.countPostsByCreator(allPosts);
    const creatorsRanking = await this.getTopCreators(allPosts);
    console.log('counter2', counterPostByCreator);
    this.analyticsRawData = allPosts;

    return { creatorsRanking, counterPostByCreator };
  }
}
