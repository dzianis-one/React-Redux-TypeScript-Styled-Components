import * as React from 'react';
/* tslint:disable-next-line */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchStationsElements, fetchInformationElements } from '../actions';
import { Main, MainWrapper, BodyWrapper, Paragraph } from '../utils/constant/styles';

import List from '../components/List';
import Item from '../components/Item';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Button from '../components/Button';

// helpers
import { mergeArrayObjects } from '../helpers/mergeArrayObjects';

interface LayoutContainerProps {
  dispatch: any;
  stations?: StationsProps;
  infromation?: InformationProps;
}

interface StationsProps {
  stations?: ItemsProps;
}

interface ItemsProps {
  data?: DataProps;
}

interface DataProps {
  stations?: {
      name?: string;
    }[];
    length?: number;
}

interface InformationProps {
  infromation?: ItemsInformationProps;
}

interface ItemsInformationProps {
  data?: DataInformationProps;
}

interface DataInformationProps {
  stations?: {
    station_id?: string;
    }[];
    length?: number;
}

const LayoutContainer = ({ dispatch, stations, infromation }: LayoutContainerProps) => {
  const loadItemStep = 20;
  const firstLoadItemAmount = 40;

  const [loadItems, setLoadItems] = useState(firstLoadItemAmount);

  const st: any = [];
  let al: any = [];
  let stationsLine: any[] = [];
  let infromationLine: any[] = [];

  const statn = stations.stations;
  const info = infromation.infromation;

  useEffect(() => {
    dispatch(fetchStationsElements());
    dispatch(fetchInformationElements());
  }, []);

  if (info && info.data) {
    stationsLine = info.data.stations;
  }

  if (statn && statn.data) {
    infromationLine = statn.data.stations;
  }

  if (stationsLine.length > 0 && infromationLine.length > 0) {
    al = mergeArrayObjects(stationsLine, infromationLine);

    al
      .slice(0, loadItems)
      .map((item: any) => item && st.push(<Item key={item.station_id} item={item} />));
  }

  return <BodyWrapper>
    <MainWrapper>
      <Header />
      <Main>
          {al.length > 0 ?
            <>
              <List st={st} />
              <Button
                onSetLoadItems={() => setLoadItems(loadItems + 10)}
                text={loadItems >= al.length ? `All ${al.length} stations showed` : `Show more ${loadItemStep} stations`}
                disabled={loadItems >= al.length}
              />
            </>
            : al.length === 0 ?
            <Paragraph withPadding>Nothing found</Paragraph> : <Loader />
          }
      </Main>
    </MainWrapper>
  </BodyWrapper>;
};

const mapState = function mapStateToProps(state: { stations: StationsProps, infromation: InformationProps }) {
  const { stations, infromation } = state;

  return { stations, infromation };
};

export default connect(mapState)(LayoutContainer);
