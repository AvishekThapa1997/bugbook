"use server";
import { IUserService, userService } from "../../../../services/user";

class UserActions {
  constructor(private userService: IUserService) {}
  async getUserRecommendations() {
    return this.userService.getUserRecommendations();
  }
}

const userActions = new UserActions(userService);
export const getUserRecommendations: typeof userActions.getUserRecommendations =
  userActions.getUserRecommendations.bind(userActions);
