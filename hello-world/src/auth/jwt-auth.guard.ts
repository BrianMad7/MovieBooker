// https://docs.nestjs.com/recipes/passport

import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuard extends AuthGuard('jwt') {}