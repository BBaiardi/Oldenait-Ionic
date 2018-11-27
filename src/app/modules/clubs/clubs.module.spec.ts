import { ClubsModule } from './clubs.module';

describe('ClubsModule', () => {
  let clubsModule: ClubsModule;

  beforeEach(() => {
    clubsModule = new ClubsModule();
  });

  it('should create an instance', () => {
    expect(clubsModule).toBeTruthy();
  });
});
