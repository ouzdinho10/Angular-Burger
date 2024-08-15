import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBurgerComponent } from './edit-burger.component';

describe('EditBurgerComponent', () => {
  let component: EditBurgerComponent;
  let fixture: ComponentFixture<EditBurgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBurgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
