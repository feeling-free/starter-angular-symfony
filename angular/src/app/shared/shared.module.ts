import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontawesomeModule } from '@shared/fontawesome.module';
import { MaterialModule } from '@shared/material.module';
import { TranslateModule } from '@ngx-translate/core';

import { AlertComponent } from '@shared/component/alert/alert.component';
import { LuckyNumberComponent } from '@shared/component/lucky-number/lucky-number.component';
import { ErrorDonkeyComponent } from '@shared/component/error-donkey/error-donkey.component';
import { Nl2brPipe } from '@shared/pipe/nl2br.pipe';
import { TestServiceClient } from '@pb/app/test-service';
import { AuthenticationServiceClient } from '@pb/app/authentication-service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
  ],
  declarations: [
    AlertComponent,
    ErrorDonkeyComponent,
    LuckyNumberComponent,
    Nl2brPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    FontawesomeModule,
    MaterialModule,
    TranslateModule,

    AlertComponent,
    ErrorDonkeyComponent,
    LuckyNumberComponent,
    Nl2brPipe,
  ],
  providers: [
    TestServiceClient,
    AuthenticationServiceClient,
  ]
})
export class SharedModule {
}
