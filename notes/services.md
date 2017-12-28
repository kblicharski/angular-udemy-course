# Services and Dependency Injection
Services are a super important part of Angular. They can be used as a
 better way of managing and passing around complex state information about your application.

Recall that we can use the `@Input()` and `@Output()` decorators to pass information
between components. If we have heavily nested components, this can lead to extremely
long chains of inputs and outputs that consist mostly of duplicated code;
detecting that an event was fired and passing the information up by firing another event.

Services don't discretely fall into a category of the MVC architecture. While our
component templates are our views, our TypeScript component code our controllers,
and our data classes and interfaces our models, services serve a different purpose.

So far, we have described how services can act as "servers" for our data. They can
also be ways of abstracting out common controller actions so that they can be reused.
One trivial example is, what if you have a method on your components that logs error data?
This method has a very similar implementation everywhere it is used. We can make its
behavior more consistent and more reliable by abstracting it into a service, and then
using dependency injection to use this behavior wherever we want it.

Therefore, services fulfill a few important roles:
1. Allow us to be more DRY -- reduce code duplication.
2. Allow for more reliable and consistent behavior -- methods can only be broken
in ONE canonical location, not in a location hidden among (potentially) dozens.
3. Allow for canonical, immutable data stores -- we can store data in a service,
and when we want to use it in a component, return a copy. This allows us to never
accidentally mutate data when we didn't mean to, and makes sure that we aren't
creating local stores of data throughout our component logic that could become
"out of sync".

Overall, services function as a central, authoritative source for application
data and application behavior.

# Creating Services - An Example LoggerService
From what you have learned thus far about components and directives, you might
think that Angular has some sort of `@Service()` decorator that we define on a class.
This isn't the case; as with models, services are just normal TypeScript classes. 

However, there IS a decorator we must use -- `@Injectable()`.
