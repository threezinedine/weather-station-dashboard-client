import React from 'react'

import { 
    Form,
} from 'components'


const App: React.FC = () => {
    return (
        <div>
            <Form 
                fields={[
                    {
                        name: "username",
                        label: "Username",
                    },
                    {
                        name: "password",
                        label: "Password",
                    }
                ]}
            />
        </div>
    )
}

export default App
