import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCastComponent } from './full-cast.component';

describe('FullCastComponent', () => {
  let component: FullCastComponent;
  let fixture: ComponentFixture<FullCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
