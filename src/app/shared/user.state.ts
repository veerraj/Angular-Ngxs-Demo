import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from './user.model';
import { AddUser, DeleteUser, EditUser } from './user.action';

export class UserStateModel {
    users: User[];
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})
export class UserState {

    // @Selector()
    // static getUsers(state: UserStateModel) {
    //     return state.users;
    // }

    @Action(AddUser)
    add({getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
        const state = getState();
        patchState({
            users: [...state.users, payload]
        });
    }

    @Action(DeleteUser)
    delete({getState, patchState }: StateContext<UserStateModel>, { payload }: DeleteUser) {
        // const state = getState();
        patchState({
            users: getState().users.filter(a => a.name != payload)
        });
    }

    @Action(EditUser)
    update({getState, setState }: StateContext<UserStateModel>, { payload,name }: EditUser) {
        const state = getState();
            const users = [...state.users];
            const indexno = users.findIndex(user => user.name === name);
            console.log(indexno)
            users[indexno] = payload;
            setState({
                ...state,
                users: users,
            });
    }
}