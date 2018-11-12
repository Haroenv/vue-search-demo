import data from './data.json';
// import levenshtein from 'fast-levenshtein';

// const searchableAttributes = ['name', 'description'];
// const typoTolerance = 2;

const searchClient = {
  search: function mySearch(requests) {
    return Promise.resolve({
      results: requests.map(({ params: { hitsPerPage, query } }) => {
        const normalisedQuery = query.toLocaleLowerCase();
        // const queryRegex = new RegExp(`(${normalisedQuery})`, 'gi');

        return {
          hits: data
            .reduce((acc, obj) => {
              if (!normalisedQuery) {
                acc.push(obj);
                return acc;
              }

              // #region typo-tolerance
              // const typos = searchableAttributes.map(attribute => {
              //   const value = obj[attribute] || '';
              //   let possibleMatches = value.toLocaleLowerCase().split(' ');

              // #region prefix
              // possibleMatches = possibleMatches.reduce((words, word) => {
              //   const wordPrefixes = word
              //     .split('')
              //     .reduce((prefixes, letter) => {
              //       const previousLetter =
              //         prefixes[prefixes.length - 1] || '';
              //       prefixes.push(previousLetter + letter);
              //       return prefixes;
              //     }, []);
              //   words = words.concat(wordPrefixes);
              //   return words;
              // }, []);
              // #endregion prefix

              //   const typosPerWord = possibleMatches.map(word => {
              //     const normalisedWord = word.toLocaleLowerCase();
              //     return levenshtein.get(normalisedQuery, normalisedWord);
              //   });
              //   return Math.min(...typosPerWord);
              // });

              // if (typos.some(typo => typo <= typoTolerance)) {
              //   acc.push({
              //     ...obj,
              //     _rankingInfo: {
              //       typos,
              //     },
              //   });
              //   return acc;
              // }
              // #endregion typo-tolerance

              // #region filtering
              // if (
              //   searchableAttributes.some(attribute =>
              //     queryRegex.test(obj[attribute])
              //   )
              // ) {
              //   acc.push(obj);
              // }
              // #endregion

              return acc;
            }, [])
            // #region sorting
            // .sort((a, b) => {
            //   if (!query) {
            //     return 0;
            //   }
            //   for (let i; i < a._rankingInfo.typos.length; i++) {
            //     const diff = a._rankingInfo.typos[i] - b._rankingInfo.typos[i];
            //     if (diff <= 0) {
            //       return diff;
            //     }
            //   }
            //   return 0;
            // })
            // #endregion
            .slice(0, hitsPerPage),
          // #region highlighting
          // .map(obj =>
          //   highlight({
          //     obj,
          //     queryRegex,
          //     query,
          //   })
          // ),
          // #endregion
        };
      }),
    });
  },
};

// #region highlighting
// function highlight({ obj, queryRegex, query }) {
//   obj._highlightResult = searchableAttributes.reduce(
//     (highlightResult, attribute) => {
//       highlightResult[attribute] = {
//         value: query
//           ? (obj[attribute] || '').replace(
//               queryRegex,
//               '__ais-highlight__$1__/ais-highlight__'
//             )
//           : obj[attribute] || '',
//       };

//       return highlightResult;
//     },
//     {}
//   );
//   return obj;
// }
// #endregion

export default searchClient;
