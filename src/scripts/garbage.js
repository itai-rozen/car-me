
        {/* <select defaultValue={'Choose Company'} 
            onChange={(e) => setChosenMaker(carMakers.find(maker => maker.MakeId === +e.target.value))}>
            <option disabled>Choose Company</option>
            {
                carMakers
                .sort((a, b) => b.MakeName > a.MakeName ? -1 : 1)
                .map(maker => <option key={maker.MakeId} value={maker.MakeId}>{maker.MakeName}</option>)
            }
        </select> */}
                    // <select defaultValue={'Choose Model'} onChange={(e) => setChosenModel(models.find(model => model.Model_ID === +e.target.value))}>
        //     <option disabled>Choose Model</option>
        //     {
        //         models
        //             .sort((a, b) => b.Model_Name > a.Model_Name ? -1 : 1)
        //             .map(model => {
        //                 return <option key={model.Model_ID}
        //                     value={model.Model_ID}>
        //                     {model.Model_Name}
        //                 </option>
        //             })
        //     }
        // </select>
            // <select defaultValue={'Choose Year'}
            //     onChange={(e) => setChosenModelYear(e.target.value)} >
            //     <option disabled>Choose Year</option>
            //     {
            //         modelYears
            //             .sort((a, b) => b.modelYear > a.modelYear ? -1 : 1)
            //             .filter(year => year.modelYear !== '9999')
            //             .map(year => <option key={year.modelYear} value={year.modelYear}>{year.modelYear}</option>)
            //     }
            // </select>

            // <button onClick={() => addModelToUserList()}>add to your models</button
