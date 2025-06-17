const HTTP_POST_METHOD = "POST" as const;
const HTTP_GET_METHOD = "GET" as const;

const HTTP_STATUS_OK = 200 as const;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500 as const;

type User = {
  name: string;
  age: number;
  roles: string[];
  createdAt: Date;
  isDeleated: boolean;
};

type ApiRequest = {
  method: typeof HTTP_POST_METHOD | typeof HTTP_GET_METHOD;
  host: string;
  path: string;
  body?: User;
  params: { [key: string]: string };
};

type ObserverHandlers<T> = {
  next?: (value: T) => void;
  error?: (error: any) => void;
  complete?: () => void;
};

class Observer<T> {
  handlers: ObserverHandlers<T>;
  isUnsubscribed: boolean;
  _unsubscribe?: () => void;

  constructor(handlers: ObserverHandlers<T>) {
    this.handlers = handlers;
    this.isUnsubscribed = false;
  }

  next(value: T): void {
    if (this.handlers.next && !this.isUnsubscribed) {
      this.handlers.next(value);
    }
  }

  error(error: any): void {
    if (!this.isUnsubscribed) {
      if (this.handlers.error) {
        this.handlers.error(error);
      }

      this.unsubscribe();
    }
  }

  complete(): void {
    if (!this.isUnsubscribed) {
      if (this.handlers.complete) {
        this.handlers.complete();
      }

      this.unsubscribe();
    }
  }

  unsubscribe(): void {
    this.isUnsubscribed = true;

    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}

class Observable<T> {
  _subscribe: (observer: Observer<T>) => () => void;

  constructor(subscribe: (observer: Observer<T>) => () => void) {
    this._subscribe = subscribe;
  }

  static from<T>(values: T[]): Observable<T> {
    return new Observable((observer) => {
      values.forEach((value) => observer.next(value));
      observer.complete();
      return () => {
        console.log("unsubscribed");
      };
    });
  }

  subscribe(obs: ObserverHandlers<T>): { unsubscribe: () => void } {
    const observer = new Observer(obs);
    observer._unsubscribe = this._subscribe(observer);

    return {
      unsubscribe() {
        observer.unsubscribe();
      },
    };
  }
}

const userMock: User = {
  name: "User Name",
  age: 26,
  roles: ["user", "admin"],
  createdAt: new Date(),
  isDeleated: false,
};

const requestsMock: ApiRequest[] = [
  {
    method: HTTP_POST_METHOD,
    host: "service.example",
    path: "user",
    body: userMock,
    params: {},
  },
  {
    method: HTTP_GET_METHOD,
    host: "service.example",
    path: "user",
    params: {
      id: "3f5h67s4s",
    },
  },
];

const handleRequest = (
  request: ApiRequest
): {
  status: typeof HTTP_STATUS_OK | typeof HTTP_STATUS_INTERNAL_SERVER_ERROR;
} => {
  return { status: HTTP_STATUS_OK };
};

const handleError = (
  error: any
): { status: typeof HTTP_STATUS_INTERNAL_SERVER_ERROR } => {
  return { status: HTTP_STATUS_INTERNAL_SERVER_ERROR };
};

const handleComplete = (): void => console.log("complete");

const requests$ = Observable.from(requestsMock);

const subscription = requests$.subscribe({
  next: handleRequest,
  error: handleError,
  complete: handleComplete,
});

subscription.unsubscribe();
