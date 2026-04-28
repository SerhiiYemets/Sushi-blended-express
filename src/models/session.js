import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
    userAgent: String,
    ip: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

sessionSchema.index({ accessToken: 1 });

sessionSchema.index({ userId: 1, refreshToken: 1 });

sessionSchema.index(
  { refreshTokenValidUntil: 1 },
  { expireAfterSeconds: 0 }
);

export const Session = model('Session', sessionSchema);
