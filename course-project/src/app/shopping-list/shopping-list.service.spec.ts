import { inject, TestBed } from '@angular/core/testing';

import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingListService]
    });
  });

  it(
    'should be created',
    inject([ShoppingListService], (service: ShoppingListService) => {
      expect(service).toBeTruthy();
    })
  );
});
