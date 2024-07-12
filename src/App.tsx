
import { Button, Separator } from '@radix-ui/themes'
import Illustration from './assets/alien-lab.svg'
import { Footer } from './components/Footer'
import { RatingDialog } from './components/RatingDialog'
import { RatingList } from './components/RatingList'
import { TopCards } from './components/Topcards'
import { CurrentUserContextProvider } from './context/currentUserContextProvider'

function App() {

  return (
      <CurrentUserContextProvider>
        <div>
            <TopCards />
          <main className='p-4 flex flex-col gap-4 items-center bg-indigo-100'>
            <Separator orientation="vertical" size="1" mb="-5"/>
            <section className='w-full flex flex-col items-center pt-1'>
                <img src={Illustration} width="200px"/>
                <RatingDialog>
                  <Button 
                          mt="-4"
                          size="4"
                          color="green" 
                          radius="full"
                          className="p-5 hover:transform hover:scale-105 transition-transform duration-500 ease-in-out"
                      >
                          Deixe sua marca na comunidade!
                          <i className="pi pi-bolt" style={{ fontSize: '1rem', color: 'white' }} />
                  </Button>
                </RatingDialog>
            </section>
            <Separator orientation="vertical" size="2" />
            <section>
              <RatingList />
            </section>
          </main>
            <Footer />
        </div>
      </CurrentUserContextProvider>
  )
}

export default App
