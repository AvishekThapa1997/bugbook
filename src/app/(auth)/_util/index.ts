import "server-only";
import { cache } from "react";
import { authService } from "../../../services/auth";

export const getLoggedInUser = cache(() => authService.getLoggedInUser());
