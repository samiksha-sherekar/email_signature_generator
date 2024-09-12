import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePreviewComponent } from './signature-preview.component';

describe('SignaturePreviewComponent', () => {
  let component: SignaturePreviewComponent;
  let fixture: ComponentFixture<SignaturePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignaturePreviewComponent]
    });
    fixture = TestBed.createComponent(SignaturePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
