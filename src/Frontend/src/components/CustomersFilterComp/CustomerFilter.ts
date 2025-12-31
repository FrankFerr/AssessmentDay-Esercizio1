export class CustomerFilter{
    name: string
    email: string

    public constructor(name: string, email: string){
        this.name = name
        this.email = email
    }

    public ApplyFilter(url: string): string {
        let result = url

        if(this.name.trim().length !== 0){
            if(result.indexOf("?") === -1)
                result += "?"
            else
                result += "&"

            result += `Name=${this.name}`
        }

        if(this.email.trim().length !== 0){
            if(result.indexOf("?") === -1)
                result += "?"
            else
                result += "&"

            result += `Email=${this.email}`
        }

        return result
    }
}