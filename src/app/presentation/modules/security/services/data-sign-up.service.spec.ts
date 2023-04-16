import { DataSignUpService } from './data-sign-up.service';

describe('DataSignUpService', () => {
  let service: DataSignUpService;

  beforeEach(() => {
    service = new DataSignUpService();
  });

  it('should set and get data', (done) => {
    const email = 'test@test.com';
    const firebaseId = '12345';
    const name = 'Test User';

    service.setData(email, firebaseId, name);

    service.getData().subscribe((data) => {
      expect(data.email).toEqual(email);
      expect(data.firebaseId).toEqual(firebaseId);
      expect(data.name).toEqual(name);
      done();
    });
  });
});
