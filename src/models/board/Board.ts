export interface Board {
  id: string;
  title: string;
  columns: [
    {
      id: string;
      title: string;
      state: {
        id: string;
        name: string;
      };
      tasks: [{ id: string }];
    }
  ];
}
