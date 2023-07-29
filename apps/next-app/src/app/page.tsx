import {
  LoginButton,
  RegisterButton,
  LogoutButton,
} from "./(components)/Buttons";
import styles from './page.module.css'

export default function Home() {

  return (
    <main>
      <LoginButton />
      <RegisterButton />
      <LogoutButton />
    </main>
  );
}
