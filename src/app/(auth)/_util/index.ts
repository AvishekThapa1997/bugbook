import "server-only";
import { cache } from "react";
import { authService } from "../_service";

export const getLoggedInUser = cache(() => authService.getLoggedInUser());
