import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatsListPage } from './chats-list.page';

describe('ChatsListPage', () => {
  let component: ChatsListPage;
  let fixture: ComponentFixture<ChatsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
