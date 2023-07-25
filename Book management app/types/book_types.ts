import express from 'express';
namespace Book {
  export interface Item {
    id: number,
    title: string,
    author: string,
    publicationYear: number
  }

  export interface Request extends express.Request {
    body: Item,
    query: {
      page: string;
      pageSize: string;
    }
  }

  export interface Response extends express.Response {
    send: (body: string | {
      page: number,
      pageSize: number,
      total: number,
      items: Array<Item>  
    }) => this
  }
}

export default Book;