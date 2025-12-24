class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://neondb_owner:npg_g0N7mRDuZfKB@ep-long-tree-adsh5yl5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "super-secret-key"
    DEBUG = True
