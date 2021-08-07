import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver()
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query((_) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((_) => Boolean)
  createRestaurant(@Args() createRestaurantDto: createRestaurantDto): boolean {
    return true;
  }
}
