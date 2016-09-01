# Angular 2 + TypeScript Overview
#### For those who are used to Angular 1 + ES5

## Getting started
```bash
npm install && npm start
```

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
  constructor({left_sph, right_sph}: {left_sph: number, right_sph: number}) {
    Object.assign(this, {left_sph, right_sph});
  }

  logProp(prop: string): void {
    console.log(this[prop]);
  }
}
let rx = new TypeScriptPrescription({right_sph: 2});
```

Now, let's instantiate these:

```js
var es5Prescription = new ES5Prescription ({
  left_sph: 1,
  right_sph: 1
});

let es2015Prescription = new ES2015Prescription({
  left_sph: 1,
  right_sph: 1
});

let typeScriptPrescription = new TypeScriptPrescription({
  left_sph: 1,
  right_sph: 1
});
```

They're virtually the same.  But the TypeScript implementation imposes certain constraints that the others don't.  We can't assign properties other than `left_sph` and `right_sph`, and we can't assign values that aren't of type `number` to those property names.  Don't worry, though: `NaN` is still a `number` in TypeScript!

## Where are the controllers and directives?

There are no more controllers as we knew them.  Controllers are now strictly used as children of directives.

![Angular 2 directive talking to a controller](http://i.giphy.com/rVZEejvVWEbug.gif)

Roughly speaking, components have become the building blocks of our Angular 2 applications:

```ts
// @Component is a decorator function.  We invoke it before the class declaration
// to add metadata to the HeroDetailComponent that Angular uses to manage the life
// cycle of this component.
@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // constructors in Angular 2 are the place where we inject other modules into
  // the class.
  constructor (
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  // ngOnInit runs when the component is instantiated
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  // prototype methods
  goBack(): void {
    window.history.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(this.goBack);
  }

  // another decorator! @Input is used to bind the `hero` object to the template.
  // this allows us to use two-way binding.  `hero: Hero;` tells us that the `hero`
  // object is of type `Hero`.
  @Input()
  hero: Hero;
}
```

Each component is intended to be a unit of markup, styles and behavior, similar to a React component.

Directives, on the other hand, are encouraged to be more specialized in Angular 2.  We no longer assign templates to directives, that's an Angular 1 pattern.  Directives in Angular 2 are for defining behavior on an html element that already exists.  We need only define a _selector_ on the directive body:

```ts
// from http://www.waynehong.com/javascript/angular-2-attribute-directive-typescript-example/
import {Directive} from 'angular2/core';
import {NgModel} from 'angular2/common';
 
@Directive({ 
    selector: '[ngModel][uppercase]', 
    host: {
        '(input)' : 'onInputChange()'
    }
})
export class UppercaseDirective{
    
    constructor(public model:NgModel){}
    
    onInputChange(){
        var newValue = this.model.value.toUpperCase();
        this.model.valueAccessor.writeValue(newValue);
        this.model.viewToModelUpdate(newValue);
    }
}
```
