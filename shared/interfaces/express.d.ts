declare global {
  namespace Express {
    interface Request {
      user?: import("@modules/auth/domain/entities/user.entity").UserEntity;
    }
  }
}

export {};
