import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EntityService } from './_services/entity.service';
import { EntityResource } from './_resources/entity.resource';
import { EntityTransformer } from './_transformers/entity.transformer';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    EntityService,
    EntityResource,
    EntityTransformer
  ]
})
export class AngularAemsModule { }
