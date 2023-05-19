import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchParams } from '../models/search-params.interface';
import { BookItem } from '../models/book-item.interface';
import { CollectionResultModel } from '../../../shared/models/collection-result.interface';

@Injectable()
export class BooksService {
  private baseUri = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private httpClient: HttpClient) {}

  /**
   * @param searchParams
   * @returns  @see{@link Volume}
   */
  public getBooksCollection(
    searchParams: SearchParams
  ): Observable<CollectionResultModel<BookItem[]>> {
    return this.httpClient.get<CollectionResultModel<BookItem[]>>(
      this.baseUri,
      {
        params: {
          q: searchParams.searchTerm,
          subject: searchParams.category,
          orderBy: searchParams.orderBy ? searchParams.orderBy : 'relevance',
          startIndex: searchParams.startIndex,
          maxResults: 30,
        },
      }
    );
  }

  /**

   * @param bookId
   * @returns
   */
  public getBookById(bookId: string): Observable<BookItem> {
    return this.httpClient.get<BookItem>(`${this.baseUri}/${bookId}`);
  }
}
