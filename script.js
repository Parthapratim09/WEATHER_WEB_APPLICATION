document.addEventListener('DOMContentLoaded', () => {
            const API_KEY = 'aa9311334122d5496432de1c79f1801e';
            const searchForm = document.getElementById('searchForm');
            const searchInput = document.getElementById('searchInput');
            const weatherCard = document.getElementById('weatherCard');
            const messageDiv = document.getElementById('message');
            const loaderDiv = document.getElementById('loader');

            const weatherImages = {
                ClearDay: 'https://images.unsplash.com/photo-1558418294-9da1497573f4?q=80&w=1887&auto=format&fit=crop',
                ClearNight: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=2072&auto=format&fit=crop',
                Clouds: 'https://images.unsplash.com/photo-1499956827185-0d63ee78a910?q=80&w=1932&auto=format&fit=crop',
                Rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e682?q=80&w=1887&auto=format&fit=crop',
                Drizzle: 'https://images.unsplash.com/photo-1515694346937-94d85e41e682?q=80&w=1887&auto=format&fit=crop',
                Thunderstorm: 'https://images.unsplash.com/photo-1605727226425-636c342a2b34?q=80&w=2070&auto=format&fit=crop',
                Snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2108&auto=format&fit=crop',
              
                Mist: 'https://images.unsplash.com/photo-1482836260217-4a23555c3533?q=80&w=2070&auto=format&fit=crop',
                Smoke: 'https://images.unsplash.com/photo-1482836260217-4a23555c3533?q=80&w=2070&auto=format&fit=crop',
                Haze: 'https://images.unsplash.com/photo-1482836260217-4a23555c3533?q=80&w=2070&auto=format&fit=crop',
                Fog: 'https://images.unsplash.com/photo-1482836260217-4a23555c3533?q=80&w=2070&auto=format&fit=crop',
                Dust: 'https://images.unsplash.com/photo-1482836260217-4a23555c3533?q=80&w=2070&auto=format&fit=crop',
                Sand: 'https://images.unsplash.com/photo-1482836260217-4a23555c3533?q=80&w=2070&auto=format&fit=crop',
                Ash: 'https://images.unsplash.com/photo-1482836260217-4a23555c3533?q=80&w=2070&auto=format&fit=crop',
                Squall: 'https://images.unsplash.com/photo-1482836260217-4a23555c3533?q=80&w=2070&auto=format&fit=crop',
                Tornado: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2080&auto=format&fit=crop'
            };

            const fetchWeather = async (city) => {
                showLoader();
                hideMessage();
                weatherCard.classList.add('hidden');

                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.cod !== 200) {
                        throw new Error(data.message || 'City not found');
                    }
                    
                    updateUI(data);

                } catch (error) {
                    showMessage(`Error: ${error.message}`);
                    console.error("Failed to fetch weather data:", error);
                } finally {
                    hideLoader();
                }
            };

            const updateUI = (data) => {
                
                document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
                document.getElementById('weatherDesc').textContent = data.weather[0].description;
                document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°`;
                document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°`;
                document.getElementById('humidity').textContent = `${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `${data.wind.speed.toFixed(1)} m/s`;
                document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
                document.getElementById('maxTemp').textContent = `${Math.round(data.main.temp_max)}°`;
                document.getElementById('minTemp').textContent = `${Math.round(data.main.temp_min)}°`;
                document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                updateCardBackground(data.weather[0].main, data.sys.sunrise, data.sys.sunset);
                
                weatherCard.classList.remove('hidden');
            };

            const updateCardBackground = (weatherMain, sunrise, sunset) => {
                const now = Date.now() / 1000;
                const isDay = now > sunrise && now < sunset;
                let imageKey = weatherMain;
                
                if (weatherMain === 'Clear') {
                    imageKey = isDay ? 'ClearDay' : 'ClearNight';
                }

                const imageUrl = weatherImages[imageKey];

                if (imageUrl) {
                    weatherCard.style.backgroundImage = `url('${imageUrl}')`;
                    weatherCard.classList.add('has-image-bg');
                    weatherCard.classList.remove('glass-card-main');
                } else {
                    // Fallback to transparent glass effect if no specific image is found
                    weatherCard.style.backgroundImage = 'none';
                    weatherCard.classList.remove('has-image-bg');
                    weatherCard.classList.add('glass-card-main');
                }
            };
            
            const showMessage = (msg) => {
                messageDiv.textContent = msg;
                messageDiv.classList.remove('hidden');
            };
            const hideMessage = () => messageDiv.classList.add('hidden');
            const showLoader = () => loaderDiv.classList.remove('hidden');
            const hideLoader = () => loaderDiv.classList.add('hidden');

            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const city = searchInput.value.trim();
                if (city) {
                    fetchWeather(city);
                }
            });

           fetchWeather('kolkata');
        });
