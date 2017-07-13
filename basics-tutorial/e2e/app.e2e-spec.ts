import { AngularUdemyCoursePage } from './app.po';

describe('angular-udemy-course App', () => {
  let page: AngularUdemyCoursePage;

  beforeEach(() => {
    page = new AngularUdemyCoursePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
