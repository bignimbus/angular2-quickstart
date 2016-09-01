# Angular 2 + TypeScript Overview
#### For those who are used to Angular 1 + ES5

## Angular 2 encourages modularity and single-purpose design
Every "app" using Angular 2 is encapsulated in a class with a `NgModule` decorator [(example)](https://github.com/bignimbus/angular2-quickstart/blob/master/app/app.module.ts).  This is roughly analogous to `angular.module([])` in Angular 1.x.  `NgModules` read like a manifest: they essentially list all the classes that are "allowed" inside the module:

```ts
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  declarations: [AppComponent, HeroesComponent, HeroDetailComponent, DashboardComponent],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
```

One interesting takeaway is that Angular 2 doens't assume you're developing for the web browser by default.  The "bootstrap" routine in runtime-specific.  We are importing `BrowserModule` for our web app.  We could potentially choose another module for a native environment, which would presumably cut down on configuration overhead.


## ES2015 module syntax is all but required

```ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
```

```ts
export class HeroesComponent
```

Our build system will need to be adjusted in order to support these kinds of import and export statements.

## TypeScript has its charm
TypeScript can save us from ourselves, but can be frustrating to read and write while you're learning.

Consider a simple class implementation:

```js
function ES5Prescription (obj) {
  this.left_sph = obj.left_sph;
  this.right_sph = obj.right_sph;
}

ES5Prescription.prototype.logProp(prop) {
  console.log(this[prop]);
}

class ES2015Prescription {
  constructor(obj) {
    Object.assign(this, obj);
  }

  logProp(prop) {
    console.log(this[prop]);
  }
}

class TypeScriptPrescription {
  left_sph: number;
  right_sph: number;

  logProp(prop: string): void {
    console.log(this[prop]);
  }
}
```

Now, let's instantiate these:

```js
var es5Prescription = new ES5Prescription ({
  left_sph: 1,
  right_sph: 1
});

let es2015Prescription = Object.create({
  left_sph: 1,
  right_sph: 1
}, ES2015Prescription);

let typeScriptPrescription = new TypeScriptPrescription {
  left_sph: 1,
  right_sph: 1
} as TypeScriptPrescription
```
