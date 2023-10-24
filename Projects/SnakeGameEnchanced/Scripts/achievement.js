//Bogdan Gura

//Achivement class that represents 
//all achivements in the game
export class Achievement{
    /*name of the achivements (string)
    will be passed, earned(if its earned or not (boolean)),
    and a message that will be displayed
    in a message box when the achivement is unlocked (string)
    */
    constructor(name, earned, messageOnUnlock)
    {
        this.name = name;
        this.earned = earned;
        this.messageOnUnlock = messageOnUnlock;
        this.repeat = true;
    }

    //Getters
    getName()
    {
        return this.name;
    }

    getEarned()
    {
        return this.earned;
    }

    getmessageOnUnlock()
    {
        return this.messageOnUnlock;
    }

}