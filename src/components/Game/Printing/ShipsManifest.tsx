import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import SquareCard from "components/Cards/SquareCard";

import SizedInCSS from "components/SizedInCSS";
import materials from "data/materials";
import slugify from "slugify";

export const ShipsManifestComponent : React.FC = () => (
  <SquareCard className={classNames("card","captains-log")}>
    <SizedInCSS>
      <div className="log">
        <h2>Ship's Manifest</h2>
        <p>Update this whenever you gain or lose a crew member</p>
        <table className="log-table">
          <tbody>
            <tr>
              <th style={{width: "14%"}}>Name</th>
              <th style={{width: "15%"}}>Role</th>
              <th>Home System</th>
              <th>Joined</th>
              <th>Until</th>
              <th style={{width: "25%"}}>Notes</th>
            </tr>
            <tr className="sample handwritten">
              <td>Autopilot</td>
              <td></td>
              <td>The Final Shipyard</td>
              <td>1/6/20</td>
              <td>Never</td>
              <td></td>
            </tr>
            {[...Array(13)].map((_, i) => (
              <tr key={i}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="materials">
        <h2>Components</h2>
        <p>Here, you can record what componets you're using for the game. Update it as you go.</p>
        <table className="materials-table">
          <tbody>
            {materials.filter(m => !m.hideFromLog).map(m => (
            <tr key={slugify(m.name)}>
              <td>{m.name}</td>
              <td className="material-space" />
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SizedInCSS>
  </SquareCard>
);

export const ShipsManifestPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <ShipsManifestComponent />
  </div>;

export const PrintShipsManifestComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    <ShipsManifestComponent />
  </div>;
