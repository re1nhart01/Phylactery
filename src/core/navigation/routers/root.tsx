import { MainPagePresenter } from '#modules/app/pages/MainPage/main_page.page';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPagePresenter />,
  },
]);
