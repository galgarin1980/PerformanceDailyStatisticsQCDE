export class User {
    IsAuthenticated?: boolean;
    Username?: string;
    First_Name?: string;
    Last_Name?: string;
    Display_Name?: string;
    Email?: string;
    Company?: string;
    Department?: string;
    Office?: string;
    Token?: string | undefined;
    Roles?: string[];
    Groups?: string[];
 
    constructor(init?: Partial<User>) {
        if (init) {
            Object.assign(this, init);
        }
    }
 
    getFullName(): string {
        return (this.Username) ? `${this.First_Name} ${this.Last_Name}` : '';
    }
 
    get Initials(): string {
        // return ((this.FirstName) ? this.FirstName.charAt(0) : '') + ((this.LastName) ? this.LastName.charAt(0) : '');
 
        var initials = "";
        initials += this.First_Name?.charAt(0) ?? '';
        initials += this.Last_Name?.charAt(0) ?? '';
        return initials.toUpperCase();
 
        // return (this.FirstName?.charAt(0) ?? '' + this.LastName?.charAt(0) ?? '').toUpperCase();
    }
}
