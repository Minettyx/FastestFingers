// classes used to get a new object with only the properties we want as casting an object to a type or interface will not remove the unecessary properties

export class ApiProfile {
  _id?: string
  email: string
  username: string
  wins: number
  wk_points: number

  constructor(data: {
    _id?: string
    email: string
    username: string
    wins: number
    wk_points: number
  }) {
    this._id = data._id
    this.email = data.email
    this.username = data.username
    this.wins = data.wins
    this.wk_points = data.wk_points
  }
}

export class ApiPublicProfile {
  _id?: string
  username: string
  wins: number
  wk_points: number

  constructor(data: {
    _id?: string
    username: string
    wins: number
    wk_points: number
  }) {
    this._id = data._id
    this.username = data.username
    this.wins = data.wins
    this.wk_points = data.wk_points
  }
}

export class ApiTopWinsUser {
  _id?: string
  username: string
  wins: number

  constructor(data: {
    _id?: string
    username: string
    wins: number
  }) {
    this._id = data._id
    this.username = data.username
    this.wins = data.wins
  }
}

export class ApiTopWordSpeed {
  username: string
  userid: string
  word: string
  speed: number

  constructor(data: {
    username: string
    userid: string
    word: string
    speed: number
  }) {
    this.username = data.username
    this.userid = data.userid
    this.word = data.word
    this.speed = data.speed
  }
}
