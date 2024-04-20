import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    UserModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
