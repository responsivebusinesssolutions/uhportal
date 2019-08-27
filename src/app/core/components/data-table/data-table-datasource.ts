import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MatTableDataSource } from '@angular/material';


// TODO: Replace this with your own data model type
export interface DataTableItem {
  id: number;
  name: string;
  email: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {id: 1, name: 'John Paul II', email: 'polishcareergoals@gmail.com'},
  {id: 2, name: 'Bon Scott', email: 'sleepitoff@gmail.com'},
  {id: 3, name: 'John Barry', email: 'bondjamesbond@gmail.com'},
  {id: 4, name: 'Brian Jones', email: 'havefaith@yahoo.com'},
  {id: 5, name: 'Paul Gascoigne', email: 'gazzagazza@hooka.co.uk'},
  {id: 6, name: 'Antonio Margheriti', email: 'tarantinomyass@gmail.com'},
  {id: 7, name: 'Hans Landa', email: 'reichsjoker@gmail.com'},
  {id: 8, name: 'John Rider', email: 'thehitcher@yahoo.com'},
  {id: 9, name: 'Jody Reynolds', email: 'fireoflove@gmail.com'},
  {id: 10, name: 'Ari Up', email: 'pattifanclub@gmx.de'},
  {id: 11, name: 'Kalus Wunderlich', email: 'wersiking@gmx.de'},
  {id: 12, name: 'Brian Wilson', email: 'smile@gmail.com'},
  {id: 13, name: 'R. Stevie Moore', email: 'cooldaddio@gmail.com'},
  {id: 14, name: 'Saul Adamczewski', email: 'dentistonholiday@gmail.com'},
  {id: 15, name: 'Fred Neil', email: 'dolphins@gmail.com'},
  {id: 16, name: 'Bernie Lomax', email: 'welcometomycrib@yahoo.com'},
  {id: 17, name: 'Lee Hazlewood', email: 'cakeordeath@gmail.com'},
  {id: 18, name: 'Nancy Sinatra', email: 'papawasarollingstone@gmail.com'},
  {id: 19, name: 'Nicolas Cage', email: 'myparrotismybrother@yaaa-hooo.com'},
  {id: 20, name: 'Mickey Rourke', email: 'deviltookmycharm@gmail.com'},
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends MatTableDataSource<any> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  // connect(): Observable<DataTableItem[]> {
  //   // Combine everything that affects the rendered data into one update
  //   // stream for the data-table to consume.
  //   const dataMutations = [
  //     observableOf(this.data),
  //     this.paginator.page,
  //     this.sort.sortChange
  //   ];

  //   return merge(...dataMutations).pipe(map(() => {
  //     return this.getPagedData(this.getSortedData([...this.data]));
  //   }));
  // }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



