import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPersonComponent } from './create-new-person.component';

describe('CreateNewPersonComponent', () => {
  let component: CreateNewPersonComponent;
  let fixture: ComponentFixture<CreateNewPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
