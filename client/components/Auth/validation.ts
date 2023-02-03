const REQUIRED_FIELD = 'Required to fill in';
const CORRECT_VALUE = 'Enter the correct value';

export const nicknameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^[a-zA-Z0-9._-]+$/)) {
            return CORRECT_VALUE;
        }

        return true;
    }
}

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const bol = re.test(String(value));
        if(!bol) {
            return CORRECT_VALUE;
        }

        return true;
    }
}

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/)) {
            return CORRECT_VALUE;
        }

        return true;
    }
}